
import pubsub from '@google-cloud/pubsub'

export const createPubsub = ({
	projectId,
	keyFilename
}) => pubsub({
  projectId,
  keyFilename
})
