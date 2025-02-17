import AsetInternetNotConnection from '@assets/internet-not-connection.jpg'

const NotConnection = () => {
  return (
    <section className="relative w-full h-screen flex-center flex-col">
      <div className=" bg-white relative z-1 flex-center flex-col gap-2">
        <h1 className="text-xl md:text-3xl font-medium text-secondary-foreground">OFFLINE</h1>
        <p className="text-muted font-medium text-xs md:text-lg text-wrap">Please check your internet connection.</p>
      </div>
      <div className="  md:w-[40%] md:-mt-10 flex-center  h-auto">
        <img
          src={AsetInternetNotConnection}
          alt="aset-internet-not-connection"
          className="object-cover aspect-square w-full h-full "
        />
      </div>
    </section>
  )
}

export default NotConnection
