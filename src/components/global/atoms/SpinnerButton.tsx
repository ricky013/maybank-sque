import { LoadingSpinner } from '@/components/ui/loading-spinner'

const SpinnerButton = ({ loading, statusAction }: { loading: boolean; statusAction: string }) => {
  return (
    <>
      {loading ? (
        <>
          <LoadingSpinner />
          {statusAction}
        </>
      ) : (
        <>{statusAction}</>
      )}
    </>
  )
}

export default SpinnerButton
