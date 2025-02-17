import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import DataTable from 'react-data-table-component'
import { customStylesInlineDataTable } from '@/lib/style'
import { INavigateAction, IPagination } from '@interfaces/utility.interface'

// Interfaces for Component Props and Data
interface IShowDataTable<T extends object> {
  list: T[]
  params: IPagination
  handlePageChange: (page: number) => void
  handlePerRowsChange: (rowsPerPage: number) => void
  aksi?: string
  linkActionRedirect?: INavigateAction[]
  headerBackgroundColor?: string
}

interface Column<T> {
  name: any
  cell: (row: T, index: number) => JSX.Element
  width?: string
  right?: boolean
  center?: boolean
  button?: boolean
}

const InlineTablePagination = <T extends object>({
  list,
  params,
  handlePageChange,
  handlePerRowsChange,
  aksi,
  linkActionRedirect,
  headerBackgroundColor = '#f5f5f5'
}: IShowDataTable<T>) => {
  const [data, setData] = useState(list)
  const navigate = useNavigate()
  const [paramsState, setParamsState] = useState(params)

  useEffect(() => {
    setParamsState(params)
  }, [params])

  useEffect(() => {
    setData(list)
  }, [list])

  const columns: Array<Column<T>> = [
    {
      name: 'No.',
      cell: (row, index: number) => (
        <span>{(paramsState?.currentPage - 1) * paramsState?.limit + Number(index + 1)}</span>
      ),
      width: '3rem',
      right: true,
      center: true
    }
  ]

  if (data?.length > 0) {
    const keys = Object.keys(data[0])

    keys.forEach((key) => {
      switch (key) {
        case 'nameUserKonsultasi':
          columns.push({
            name: 'Nama User',
            cell: (row: any) => <p className="w-full text-sm text-center text-wrap">{row.nameUserKonsultasi}</p>,
            width: '10%'
          })
          break
        case 'konsultasiId':
          columns.push({
            name: 'Kode Konsultasi',
            cell: (row: any) => <p className="w-full text-sm text-center text-wrap">{row.konsultasiId}</p>,
            width: '10%'
          })
          break
        case 'userHistoriKonsultasi':
          columns.push({
            name: (
              <div className="relative w-full h-full">
                <h2 className="pt-2">User</h2>
              </div>
            ),
            cell: (row: any) => (
              <div className="grid w-full my-1 h-full grid-cols-1 ms-[3px]">
                {row.userHistoriKonsultasi.map((user: any, index: number) => (
                  <p key={index} className="ps-2 py-1 flex-center text-center text-wrap">
                    {user.name}
                  </p>
                ))}
              </div>
            )
          })
          break
        case 'hasilHistoriKonsultasi':
          columns.push({
            name: (
              <div className="relative w-full h-full">
                <h2 className="pt-2">Hasil</h2>
                <div className="grid w-full grid-cols-2 mt-[6px] border-t-[2px]  border-[#E5E5E5]">
                  <span className="py-[6px]">Nama Karir</span>
                  <span className="py-[6px] border-l-[2px]  border-[#E5E5E5]">Percentase</span>
                </div>
              </div>
            ),
            cell: (row: any) => (
              <div className="grid w-full h-full grid-cols-2 my-1 ms-[3px]">
                {row?.hasilHistoriKonsultasi.length > 0 ? (
                  row?.hasilHistoriKonsultasi?.map((hasil: any, index: number) => (
                    <>
                      <p
                        key={index}
                        className="pr-2 text-center text-wrap border-r-[2px]  border-[#E5E5E5] flex-center"
                      >
                        {hasil.karirName ? hasil?.karirName : ' - '}
                      </p>
                      <p className="ps-2 py-1 flex-center text-center text-wrap">
                        {hasil.percentage ? hasil.percentage : ' - '}
                      </p>
                    </>
                  ))
                ) : (
                  <>
                    <p className="pr-2 text-center text-wrap border-r-[2px]  border-[#E5E5E5] flex-center">-</p>
                    <p className="ps-2 py-1 flex-center text-center text-wrap">-</p>
                  </>
                )}
              </div>
            )
          })
          break
        case 'minatHistoriKonsultasi':
          columns.push({
            name: (
              <div className="relative w-full h-full">
                <h2 className="pt-2">Minat</h2>
              </div>
            ),
            cell: (row: any) => (
              <div className="grid w-full my-1 h-full grid-cols-1 ms-[3px]">
                {row.minatHistoriKonsultasi.map((minat: any, index: number) => (
                  <p key={index} className="ps-2 py-1 flex-center text-center text-wrap">
                    {minat.name}
                  </p>
                ))}
              </div>
            )
          })
          break
        case 'keahlianHistoriKonsultasi':
          columns.push({
            name: (
              <div className="relative w-full h-full">
                <h2 className="pt-2">Keahlian</h2>
              </div>
            ),
            cell: (row: any) => (
              <div className="grid w-full my-1 h-full grid-cols-1 ms-[3px]">
                {row.keahlianHistoriKonsultasi.map((minat: any, index: number) => (
                  <p key={index} className="ps-2 py-1 flex-center text-center text-wrap">
                    {minat.name}
                  </p>
                ))}
              </div>
            )
          })
          break
        case 'tanggalHistoriKonsultasi':
          columns.push({
            name: 'Tanggal',
            cell: (row: any) => <p className="w-full text-sm text-center text-wrap">{row.tanggalHistoriKonsultasi}</p>,
            width: '10%'
          })
          break
        case 'jamHistoriKonsultasi':
          columns.push({
            name: 'Jam',
            cell: (row: any) => <p className="w-full text-sm text-center text-wrap">{row.jamHistoriKonsultasi}</p>,
            width: '10%'
          })
          break

        case 'image':
          columns.push({
            name: 'Gambar',
            cell: (row: any) => (
              <div className="flex-center w-full">
                <Avatar>
                  <AvatarImage src={row?.image || ''} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            )
          })
          break
        default:
          break
      }
    })
  }

  // Switch case for aksi
  switch (aksi) {
    case 'saveDeleteAndDetail':
      columns.push({
        name: 'AKSI',
        width: '12rem',
        cell: (row: any) => (
          <span className="flex flex-row items-center justify-center w-full gap-2 p-3">
            {linkActionRedirect?.map(({ label, redirect }: INavigateAction, index: number) => {
              switch (label) {
                case 'Detail':
                  return (
                    <Button
                      key={index}
                      variant="secondary"
                      size="xs"
                      onClick={() => navigate(`/${redirect}/detail/${row.id}`)}
                    >
                      {label}
                    </Button>
                  )

                case 'Delete':
                  return (
                    <Button
                      key={index}
                      variant="danger"
                      size="xs"
                      onClick={() => navigate(`${redirect}/delete/${row.id}`)}
                    >
                      {label}
                    </Button>
                  )
                case 'Edit':
                  return (
                    <Button
                      key={index}
                      variant="active"
                      size="xs"
                      onClick={() => navigate(`${redirect}/edit/${row.id}`)}
                    >
                      {label}
                    </Button>
                  )

                default:
                  break
              }
            })}
          </span>
        )
      })
      break

    default:
      break
  }

  return (
    <DataTable
      data={data}
      columns={columns}
      defaultSortFieldId={1}
      pagination
      paginationServer
      paginationTotalRows={paramsState.totalItems}
      paginationRowsPerPageOptions={[10, 25, 50, 100]}
      paginationPerPage={paramsState.limit} // Ensures the limit you want is used initially
      paginationDefaultPage={paramsState.currentPage}
      onChangeRowsPerPage={(newLimit, page) => {
        handlePerRowsChange(newLimit)
        setParamsState((prev) => ({ ...prev, limit: newLimit, currentPage: page }))
      }}
      onChangePage={(newPage) => {
        handlePageChange(newPage)
        setParamsState((prev) => ({ ...prev, currentPage: newPage }))
      }}
      responsive
      striped
      noDataComponent="Data kosong"
      customStyles={customStylesInlineDataTable(headerBackgroundColor) as any}
      // fixedHeader
    />
  )
}

export default InlineTablePagination
