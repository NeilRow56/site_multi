type Props = {
  result: {
    data?: {
      error?: string
    }
    serverError?: string
    validationErrors?: Record<string, string[] | undefined>
  }
}

const MessageBox = ({
  type,
  content
}: {
  type: 'success' | 'error'
  content: React.ReactNode
}) => (
  <div
    className={`bg-accent my-2 rounded-lg px-4 py-2 ${type === 'error' ? 'text-red-500' : ''}`}
  >
    {type === 'success' ? '🎉' : '🚨'} {content}
  </div>
)

export function DisplayServerActionResponse({ result }: Props) {
  const { data, serverError, validationErrors } = result

  return (
    <div>
      {data?.error && (
        <MessageBox type='success' content={`Success: ${data.error}`} />
      )}

      {serverError && <MessageBox type='error' content={serverError} />}

      {validationErrors && (
        <MessageBox
          type='error'
          content={Object.keys(validationErrors).map(key => (
            <p
              key={key}
            >{`${key}: ${validationErrors[key as keyof typeof validationErrors]}`}</p>
          ))}
        />
      )}
    </div>
  )
}
