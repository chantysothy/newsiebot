#!/bin/bash

ENV=$(echo ${DEPLOYMENT_GROUP_NAME} | cut -d- -f2)
if [[ "${ENV}" == "prd" ]]; then
  # deregister instance from elb
  INSTANCE_ID=$(curl -s http://169.254.169.254/latest/meta-data/instance-id)
  REGION=$(curl -s http://169.254.169.254/latest/meta-data/placement/availability-zone | sed s'/.$//')
  /usr/local/bin/aws elb deregister-instances-from-load-balancer --region ${REGION} --load-balancer-name ${DEPLOYMENT_GROUP_NAME} --instances ${INSTANCE_ID}
fi

# stop application
systemctl stop ${APPLICATION_NAME}
