#!/bin/bash

# Validate deploy
#until [[ $(curl -sL -w "%{http_code}" http://localhost:3001/health-check -o /dev/null) = "200" ]]; do :; done

ENV=$(echo ${DEPLOYMENT_GROUP_NAME} | cut -d- -f2)
if [[ "${ENV}" == "prd" ]]; then
  # register instance with elb
  INSTANCE_ID=$(curl -s http://169.254.169.254/latest/meta-data/instance-id)
  REGION=$(curl -s http://169.254.169.254/latest/meta-data/placement/availability-zone | sed s'/.$//')
  /usr/local/bin/aws elb register-instances-with-load-balancer --region ${REGION} --load-balancer-name ${DEPLOYMENT_GROUP_NAME} --instances ${INSTANCE_ID}

  # wait until instance is in service
  until /usr/local/bin/aws elb describe-instance-health --load-balancer-name ${DEPLOYMENT_GROUP_NAME} --instances ${INSTANCE_ID} --region ${REGION} | grep -q '"State": "InService"'; do :; done
fi
