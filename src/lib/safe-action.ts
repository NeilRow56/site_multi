import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE
} from 'next-safe-action'
import { z } from 'zod'

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string()
    })
  },
  handleServerError(e, utils) {
    // You can access these properties inside the `utils` object.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { clientInput, bindArgsClientInputs, metadata, ctx } = utils
    if (e.constructor.name === 'NeonDbError') {
      return 'Database Error: Your data did not save. Support will be notified.'
    }
    // Every other error that occurs will be masked with the default message.
    return DEFAULT_SERVER_ERROR_MESSAGE
  }
})
