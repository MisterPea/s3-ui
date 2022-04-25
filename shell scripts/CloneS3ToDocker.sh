# This script if for cloning your real S3 to you LocalStack S3, while inside a running Docker container. 
# You need to find the i.p. address of the LocalStack Docker container via 'docker network inspect --network name--' and replace the LOCALSTACK_IP env variable.
# Then 'docker exec -it backend /bin/sh'. Add aws-cli 'apk add --no-cache aws-cli', 'aws configure' and add your credentials.
# Add this file to the directory, and run it: './CloneS3ToDocker.sh' 
# In the event you don't have permission to run the file, set permissions for it: 'chmod u+x CloneS3ToDocker.sh'

TEMP_DIR="/aws-s3-buckets"
LOCALSTACK_IP="176.1.0.13"

mkdir "$TEMP_DIR"

for bucket in $(aws s3api list-buckets --query "Buckets[].Name" --output text); do aws s3 sync s3://${bucket} "$TEMP_DIR"/${bucket}; done

cd "$TEMP_DIR"/
 
for bucket in $(ls); do aws s3 mb s3://${bucket} --endpoint-url http://${LOCALSTACK_IP}:4566 & aws s3 sync ./${bucket} --endpoint-url http://${LOCALSTACK_IP}:4566 s3://${bucket}; done
rm -r "$TEMP_DIR"

