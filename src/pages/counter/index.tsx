import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import asetLogoBNI from '@assets/client/images/logo-bni.svg'
import asetPeopleTeler from '@assets/client/images/orang-teller.png'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Navbar from '@/components/teller-panel/Navbar'
import ListAntrian from '@/components/teller-panel/ListAntrian'

const Teller = () => {
  return (
    <section className="w-full ">
      <Navbar />

      <div className="w-full grid xl:grid-cols-3 grid-cols-1 gap-5  overflow-hidden p-5">
        <div className="w-full h-full flex flex-col ">
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex-center">
              <img src={asetLogoBNI} alt="motif header" className="object-cover object-center " />
            </div>

            <div className="xl:w-[70%] w-[40%] border-2 mx-auto h-[249px] overflow-hidden flex-center rounded-md p-2">
              <div className="flex-center rounded-md w-full h-full bg-slate-200  border">
                <img src={asetPeopleTeler} alt="motif header" className="object-cover w-full h-full object-center " />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col h-full overflow-y-auto gap-2   p-5">
            <Label className="text-primary font-medium">PERFORMA LAYANAN</Label>

            <Table className="w-full border inline-block h-[15rem] overflow-y-auto">
              <TableHeader className="w-full sticky top-0 block bg-white ">
                <TableRow className=" flex-center">
                  <TableHead className="pt-3">JUMLAH ANTRIAN TERLAYANI : 0</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="w-full block">
                <TableRow className=" flex-col flex">
                  <TableCell className="font-medium border">0 menit 0 detik / kepuasan : 0</TableCell>
                  <TableCell className="font-medium border">0 menit 0 detik / kepuasan : 0</TableCell>
                  <TableCell className="font-medium border">0 menit 0 detik / kepuasan : 0</TableCell>
                  <TableCell className="font-medium border">0 menit 0 detik / kepuasan : 0</TableCell>
                  <TableCell className="font-medium border">0 menit 0 detik / kepuasan : 0</TableCell>
                  <TableCell className="font-medium border">0 menit 0 detik / kepuasan : 0</TableCell>
                  <TableCell className="font-medium border">0 menit 0 detik / kepuasan : 0</TableCell>
                  <TableCell className="font-medium border">0 menit 0 detik / kepuasan : 0</TableCell>
                  <TableCell className="font-medium border">0 menit 0 detik / kepuasan : 0</TableCell>
                  <TableCell className="font-medium border">0 menit 0 detik / kepuasan : 0</TableCell>
                  <TableCell className="font-medium border">0 menit 0 detik / kepuasan : 0</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="p-5 border-2 flex flex-col gap-3 rounded-sm shadow-navbar-teller">
          <div className="w-full flex-center flex-col gap-1">
            <h2 className="font-medium text-center">
              Waiting List : <span>0</span>
            </h2>

            <p className="  text-center  rounded-md py-2 px-14 bg-slate-300 font-medium text-2xl">A000</p>
          </div>

          <ul className="w-full">
            <li className="grid grid-cols-2 py-2 place-content-center justify-items-start border-t ">
              <h3 className="font-medium">Jumlah Transaksi</h3>
              <div className="flex justify-start items-center gap-2">
                <span>:</span>
                <span>0/0</span>
              </div>
            </li>
            <li className="grid grid-cols-2  py-2 place-content-center justify-items-start  border-t ">
              <h3 className="font-medium">Jenis Transaksi</h3>
              <div className="flex justify-start items-center gap-2">
                <span>:</span>
                <span>0/0</span>
              </div>
            </li>
            <li className="grid grid-cols-2  py-2 place-content-center justify-items-start  border-t">
              <h3 className="font-medium">Standar Durasi</h3>
              <div className="flex justify-start items-center gap-2">
                <span>:</span>
                <span>0/0</span>
              </div>
            </li>
            <li className="grid grid-cols-2  py-2 place-content-center justify-items-start  border-t ">
              <h3 className="font-medium">Jam Mulai Transaksi</h3>
              <div className="flex justify-start items-center gap-2">
                <span>:</span>
                <span>0/0</span>
              </div>
            </li>
            <li className="grid grid-cols-2  py-2 place-content-center justify-items-start  border-t ">
              <h3 className="font-medium">Durasi</h3>
              <div className="flex justify-start items-center gap-2">
                <span>:</span>
                <span>0/0</span>
              </div>
            </li>
          </ul>

          <div className="w-full grid grid-cols-1 gap-2">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="active" className="w-full rounded-sm">
                CALL
              </Button>
              <Button variant="active" className="w-full rounded-sm">
                RECALL
              </Button>
            </div>
            <Button variant="active" className="w-full rounded-sm">
              HOLD
            </Button>

            <Input placeholder="Catatan" type="text" />

            <Button variant="active" className="w-full rounded-sm">
              FINISH
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="active" className="w-full rounded-sm">
                NEW TRANSACTION
              </Button>
              <Button variant="active" className="w-full rounded-sm">
                DISPATCH NUMBER
              </Button>
            </div>
            <Button variant="active" className="w-full rounded-sm">
              STOP
            </Button>
          </div>
        </div>

        <ListAntrian />
      </div>
    </section>
  )
}

export default Teller
