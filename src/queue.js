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

const consume = (callback) => {
  sqs.receiveMessage(params, function (err, data) {
    if (err) {
      callback(err)
    } else if (data.Messages) {
      callback(data)
    }
  })
}

module.exports = {
  consume : consume
}
