const EmptyData = ({ message = 'Data Kosong' }: { message?: string }) => {
  return (
    <div className="w-full h-full flex-center">
      <p>{message}</p>
    </div>
  )
}

export default EmptyData
