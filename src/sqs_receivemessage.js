const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-west-2' })

const sqs = new AWS.SQS()
const queueURL = 'https://sqs.us-west-2.amazonaws.com/810028704317/awsmockery-queue'

const params = {
  AttributeNames: [
    'SentTimestamp'
  ],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: [
    'All'
  ],
  QueueUrl: queueURL,
  VisibilityTimeout: 5,
  WaitTimeSeconds: 0
}

const receive = () => {
  sqs.receiveMessage(params, function (err, data) {
    if (err) {
      console.log('Receive Error', err)
    } else if (data.Messages) {
      console.log(data.Messages)
      var deleteParams = {
        QueueUrl: queueURL,
        ReceiptHandle: data.Messages[0].ReceiptHandle
      }
    }
  })
}
setInterval(() => {
  receive()
}, 1000)
