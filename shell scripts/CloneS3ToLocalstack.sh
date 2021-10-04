# This script clones all your s3 buckets to a local directory (in this case /Users/mothership/Google Drive/JS/S3 FTP/shell scripts/aws-s3-buckets) 
# and then populates the localstack s3 mock with the same files. This allows you to rebuild your localstack mock when needed.
TEMP_DIR="/Users/mothership/Google Drive/JS/S3 FTP/shell scripts/aws-s3-buckets"
mkdir "$TEMP_DIR"

for bucket in $(aws s3api list-buckets --query "Buckets[].Name" --output text); do aws s3 sync s3://${bucket} "$TEMP_DIR"/${bucket}; done

cd "$TEMP_DIR"/
 
for bucket in $(ls); do aws s3 mb s3://${bucket} --endpoint-url http://localhost:4566 & aws s3 sync ./${bucket} --endpoint-url http://localhost:4566 s3://${bucket}; done
rm -r "$TEMP_DIR"