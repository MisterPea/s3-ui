# This script clones all your s3 buckets to a local directory (in this case /Users/mothership/aws-s3-buckets) 
# and then populates the localstack s3 mock with the same files. This allows you to rebuild your localstack mock when needed.
for bucket in $(aws s3api list-buckets --query "Buckets[].Name" --output text); do aws s3 sync s3://${bucket} /Users/mothership/aws-s3-buckets/${bucket}; done

cd /Users/mothership/aws-s3-buckets/
 
for bucket in $(ls); do aws s3 mb s3://${bucket} --endpoint-url http://localhost:4566 & aws s3 sync ./${bucket} --endpoint-url http://localhost:4566 s3://${bucket}; done