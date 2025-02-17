/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-constant-binary-expression */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatCapitalize } from '@helpers/format'
import FormInput from '../moleculs/FormInput'
import { ILoading, IPagination, ISelectOptions } from '@interfaces/utility.interface'

const customStyles = {
  headCells: {
    style: {
      border: '1px solid rgba(0,0,0,.1)',
      fontWeight: '500',
      fontSize: '.8rem',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0px', // tambahkan padding jika diperlukan
      whiteSpace: 'nowrap'
    }
  },
  cells: {
    style: {
      borderBottom: '1px solid rgba(0,0,0,.1)',
      borderInline: '1px solid rgba(0,0,0,.1)',
      paddingInline: '8px',
      paddingBlock: '0px',
      whiteSpace: 'nowrap'
    }
  }
}

interface IEditable {
  id?: string | number
  editing?: boolean
}

interface INavigateAction {
  label: string
  redirect?: string
}

export interface IIdDataError {
  id: string | number
}

interface IInlineEditTable<T extends IEditable> {
  list: T[]
  selectOptions?: ISelectOptions[]
  isLoading?: ILoading
  params: IPagination
  handlePageChange: (page: number) => void
  handlePerRowsChange: (rowsPerPage: number) => void
  aksi: string
  linkActionRedirect?: INavigateAction[]
  onSave: (row: T) => Promise<void>
  onDelete: (row: T) => void
  onShow?: (row: T) => void
  onEditDataChange?: (id: string | number, field: string, value: string | number | boolean) => void
  idDataError?: IIdDataError[]
}

interface Column<T> {
  name: any
  cell: (row: T, index: number) => JSX.Element
  width?: string
  right?: boolean
  center?: boolean
  button?: boolean
}

const InlineEditTable = <T extends IEditable>({
  list,
  selectOptions,
  isLoading,
  params,
  handlePageChange,
  handlePerRowsChange,
  aksi,
  linkActionRedirect,
  onSave,
  onDelete,
  onEditDataChange,
  idDataError
}: IInlineEditTable<T>) => {
  const [data, setData] = useState(list)
  const navigate = useNavigate()
  const [paramsState, setParamsState] = useState(params)

  useEffect(() => {
    setParamsState(params)
  }, [params])

  useEffect(() => {
    setData(list)
  }, [list])

  const toggleEditing = (id: string | number) => {
    const newData = data.map((item: any) => (item.id === id ? { ...item, editing: !item.editing } : item))
    setData(newData)
  }

  const handleEdit = (id: string | number, field: string, value: string | number | boolean) => {
    const newData = data.map((item: any) => (item.id === id ? { ...item, [field]: value } : item))
    setData(newData)

    if (onEditDataChange) {
      onEditDataChange(id, field, value)
    }
  }

  const columns: Array<Column<T>> = [
    {
      name: 'No.',
      cell: (row: any, index: number) => (
        <span>{(paramsState.currentPage - 1) * paramsState.limit + Number(index + 1)}</span>
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
        case 'nameKeahlian':
          columns.push({
            name: 'Nama',
            cell: (row: any) => (
              <EditableCell
                value={row.nameKeahlian}
                onChange={(value) => handleEdit(row.id, 'nameKeahlian', value)}
                editing={row.editing}
                type="text"
              />
            )
          })
          break
        case 'descriptionKeahlian':
          columns.push({
            name: 'Deskripsi',
            cell: (row: any) => (
              <EditableCell
                value={row.descriptionKeahlian}
                onChange={(value) => handleEdit(row.id, 'descriptionKeahlian', value)}
                editing={row.editing}
                type="text"
              />
            )
          })
          break
        case 'nameMinat':
          columns.push({
            name: 'Nama',
            cell: (row: any) => (
              <EditableCell
                value={row.nameMinat}
                onChange={(value) => handleEdit(row.id, 'nameMinat', value)}
                editing={row.editing}
                type="text"
                id={row.id}
                idDataError={idDataError || []}
              />
            )
          })
          break
        case 'nameKarir':
          columns.push({
            name: 'Nama',
            cell: (row: any) => (
              <EditableCell
                value={row.nameKarir}
                onChange={(value) => handleEdit(row.id, 'nameKarir', value)}
                editing={row.editing}
                type="text"
              />
            )
          })
          break
        case 'descriptionKarir':
          columns.push({
            name: 'Deskripsi',
            cell: (row: any) => (
              <EditableCell
                value={row.descriptionKarir}
                onChange={(value) => handleEdit(row.id, 'descriptionKarir', value)}
                editing={row.editing}
                type="text"
              />
            )
          })
          break
        case 'pengembanganKarir':
          columns.push({
            name: 'Pengembangan Karir',
            cell: (row: any) => (
              <EditableCell
                value={row.pengembanganKarir}
                onChange={(value) => handleEdit(row.id, 'pengembanganKarir', value)}
                editing={row.editing}
                type="text"
              />
            )
          })
          break
        case 'idKarir':
          columns.push({
            name: 'Kode Karir',
            cell: (row: any) => <div className="w-full text-sm text-center">{row.idKarir}</div>,
            width: '10%'
          })
          break

        case 'minat':
          columns.push({
            name: (
              <div className="relative w-full h-full">
                <h2 className="pt-2">Minat</h2>
                <div className="grid w-full grid-cols-2 mt-[6px] border-t-[2px]  border-[#E5E5E5]">
                  <span className="py-[6px]">Kode</span>
                  <span className="py-[6px] border-l-[2px]  border-[#E5E5E5]">Nama</span>
                </div>
              </div>
            ),
            cell: (row: any) => (
              <div className="grid w-full my-1 h-full grid-cols-2 ms-[3.5px]">
                {row.minat.map((minat: any, index: number) => (
                  <>
                    <span
                      key={index}
                      className="pr-2 text-center text-wrap border-r-[2px]  border-[#E5E5E5] flex-center"
                    >
                      {minat.id}
                    </span>
                    <span className="ps-2 py-1 flex-center text-center text-wrap">{minat.name}</span>
                  </>
                ))}
              </div>
            ),
            width: '25%'
          })
          break
        case 'keahlian':
          columns.push({
            name: (
              <div className="relative w-full h-full">
                <h2 className="pt-2">Keahlian</h2>
                <div className="grid w-full grid-cols-2 mt-[6px] border-t-[2px]  border-[#E5E5E5]">
                  <span className="py-[6px]">Kode</span>
                  <span className="py-[6px] border-l-[2px]  border-[#E5E5E5]">Nama</span>
                </div>
              </div>
            ),
            cell: (row: any) => (
              <div className="grid w-full my-1 h-full grid-cols-2 ms-[3px]">
                {row.keahlian.map((keahlian: any, index: number) => (
                  <>
                    <span
                      key={index}
                      className="pr-2 text-center text-wrap border-r-[2px]  border-[#E5E5E5] flex-center"
                    >
                      {keahlian.id}
                    </span>
                    <span className="ps-2 py-1 flex-center text-wrap">{keahlian.name}</span>
                  </>
                ))}
              </div>
            ),
            width: '25%'
          })

          break
        case 'basisAturanKarir':
          columns.push({
            name: 'Nama Karir',
            cell: (row: any) => <div className="w-full text-sm text-center text-wrap">{row.basisAturanKarir}</div>
          })
          break
        case 'basisAturansIdKarir':
          columns.push({
            name: 'Kode Karir',
            cell: (row: any) => <div className="w-full text-sm text-center text-wrap">{row.basisAturansIdKarir}</div>
          })
          break
        case 'certaintyFactor':
          columns.push({
            name: 'Nilai CF',
            cell: (row: any) => <div className="w-full text-sm text-center">{row.certaintyFactor}</div>
          })
          break
        case 'email':
          columns.push({
            name: 'Email',
            cell: (row: any) => (
              <EditableCell
                value={row.email}
                onChange={(value) => handleEdit(row.id, 'email', value)}
                editing={row.editing}
                type="text"
              />
            )
          })
          break
        case 'password':
          columns.push({
            name: 'Password',
            cell: (row: any) => (
              <EditableCell
                value={row.password}
                onChange={(value) => handleEdit(row.id, 'password', value)}
                editing={row.editing}
                type="password"
              />
            )
          })
          break
        case 'role':
          columns.push({
            name: 'Role',
            cell: (row: any) => (
              <EditableCell
                value={row.role}
                onChange={(value) => handleEdit(row.id, 'role', value)}
                editing={row.editing}
                selectOptions={selectOptions}
                type="select"
              />
            )
          })
          break
        case 'image':
          columns.push({
            name: 'Image',
            cell: (row: any) => (
              <EditableCell
                value={row.image}
                onChange={(value) => handleEdit(row.id, 'image', value)}
                editing={row.editing}
                type="image"
              />
            )
          })
          break

        default:
          break
      }
    })
  }

  const handleDelete = (row: T) => {
    onDelete(row)
  }

  const handleSave = async (row: T) => {
    onSave(row)
    toggleEditing(row.id || '')
  }

  useEffect(() => {
    if (idDataError) {
      idDataError.forEach((item) => {
        const idToEdit = item.id // Extract the ID
        const rowToEdit = data.find((row) => row.id === idToEdit)
        if (rowToEdit) {
          toggleEditing(String(rowToEdit.id))
        }
      })
    }
  }, [idDataError]) // Include `data` in the dependency array to handle data changes

  // render aksi
  switch (aksi) {
    case 'saveAndDelete':
      columns.push({
        name: 'AKSI',
        width: '13rem',
        cell: (row) => (
          <span className="flex flex-row items-center justify-center w-full gap-3 p-3">
            <EditButton
              row={row}
              toggleEditing={() => toggleEditing(row.id || '')}
              editing={row.editing ? row.editing : false}
              onSave={handleSave}
            />
            <Button variant="danger" size={'sm'} onClick={() => handleDelete(row)} className="text-sm">
              Hapus
            </Button>
          </span>
        )
      })
      break
    case 'saveDeleteAndDetailRedirect':
      columns.push({
        name: 'AKSI',
        width: '12rem',
        cell: (row) => (
          <span className="flex flex-row items-center justify-center w-full gap-2 p-3">
            <EditButton
              row={row}
              toggleEditing={() => toggleEditing(row.id || '')}
              editing={row.editing ? row.editing : false}
              onSave={handleSave}
              isLoading={isLoading}
            />
            <Button variant="danger" size="xs" onClick={() => handleDelete(row)}>
              {isLoading?.isLoadingDelete ? <p>Loading . . .</p> : 'Hapus'}
            </Button>
            {linkActionRedirect?.map(({ label, redirect }: INavigateAction, index: number): JSX.Element => {
              return (
                <Button
                  key={index}
                  variant="secondary"
                  size="xs"
                  onClick={() => navigate(`${redirect}/detail/${row.id}`)}
                >
                  {label}
                </Button>
              )
            })}
          </span>
        )
      })
      break
    case 'saveRedirectDeleteAndDetailRedirect':
      columns.push({
        name: 'AKSI',
        width: '12rem',
        cell: (row) => (
          <span className="flex flex-row items-center justify-center w-full gap-2 p-3">
            <Button variant="danger" size="xs" onClick={() => handleDelete(row)}>
              Hapus
            </Button>
            {linkActionRedirect?.map(({ label, redirect }: INavigateAction, index: number): JSX.Element => {
              return (
                <div key={index}>
                  {label === 'Detail' ? (
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={() => navigate(`${redirect}/detail/${row?.basisAturansIdKarir}`)}
                    >
                      {label}
                    </Button>
                  ) : (
                    <Button
                      variant="active"
                      size="xs"
                      onClick={() => navigate(`${redirect}/${row.basisAturansIdKarir}`)}
                    >
                      {label}
                    </Button>
                  )}
                </div>
              )
            })}
          </span>
        )
      })
      break
    default:
      columns.push({
        name: 'AKSI',
        cell: (row) => (
          <span className="flex flex-col w-full p-3 space-y-1">
            <EditButton
              row={row}
              toggleEditing={() => toggleEditing(row.id || '')}
              editing={row.editing ? row.editing : false}
              onSave={handleSave}
            />
          </span>
        )
      })
      break
  }

  return (
    <>
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
        customStyles={customStyles as any}
        fixedHeader
      />
    </>
  )
}

interface IEditValidation {
  name: string
  type: string
  errors: any
  customError?: {
    status: boolean
    message: string
  }
  placeholder?: string
  control: any
  disabled?: boolean
}

interface IEditableCell {
  id?: string
  idDataError?: IIdDataError[]
  value: string | number | boolean
  validation?: IEditValidation
  valueArray?: string[]
  displayValue?: string | number
  onChange: (newValue: any) => void
  editing: boolean
  type:
    | 'text'
    | 'textValidation'
    | 'checkbox'
    | 'password'
    | 'email'
    | 'minat'
    | 'image'
    | 'select'
    | 'number'
    | 'selectParentByLayanan'
  placeholder?: string
  defaultValueMultipleChecbox?: string
  selectOptions?: ISelectOptions[]
}

const EditableCell: React.FC<IEditableCell> = ({
  validation,
  value,
  valueArray,
  displayValue,
  onChange,
  editing,
  type,
  placeholder,
  selectOptions,
  id,
  idDataError
}: IEditableCell) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleImageUploud = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onChange(e.target.files)
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked
    onChange(value)
  }

  const handleSelectChange = (selectedValue: string) => {
    onChange(selectedValue)
  }

  // Tentukan className berdasarkan kondisi
  const errorClassName = id && idDataError.includes(Number(id)) ? 'border-red-600' : ''

  const renderEditableCell = () => {
    if (!editing) {
      switch (type) {
        case 'checkbox':
          return (
            <div className="p-1 overflow-hidden border border-transparent rounded cursor-pointer w-[100%]">
              <div className="w-full flex-center">
                <input
                  type="checkbox"
                  checked={Boolean(value)}
                  readOnly
                  className="border rounded outline-none "
                  placeholder={placeholder}
                />
              </div>
            </div>
          )
        case 'minat':
          return <ul>{valueArray?.map((value, index) => <li key={index}>{value}</li>)}</ul>
        case 'image':
          return (
            <div className="flex-center w-full">
              <Avatar>
                <AvatarImage src={`${(value as string) ? (value as string) : ''}`} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          )
        case 'select':
          return (
            <div className="p-1 overflow-hidden border border-transparent rounded  w-[100%]">
              <p className="text-center text-sm text-wrap lg:line-clamp-none line-clamp-3 sm:line-clamp-2">
                {formatCapitalize(String(value))}
              </p>
            </div>
          )
        case 'password':
          return (
            <div className="p-1 overflow-hidden border border-transparent rounded  w-[100%]">
              <p className="text-center text-sm text-wrap lg:line-clamp-none line-clamp-3 sm:line-clamp-2">
                {formatCapitalize(String(value))}
              </p>
            </div>
          )
        default:
          return (
            <div className={`p-1 overflow-hidden border border-transparent rounded  w-[100%]`}>
              <p className="text-center text-sm text-wrap lg:line-clamp-1  line-clamp-3 sm:line-clamp-2">
                {displayValue || value}
              </p>
            </div>
          )
      }
    }

    switch (type) {
      case 'text':
      case 'number':
        return (
          <Input
            type={type}
            value={typeof value === 'number' ? Number(value) : String(value)}
            onChange={handleInputChange}
            className={`w-full  ${errorClassName && errorClassName}`}
            placeholder={placeholder}
          />
        )

      case 'textValidation':
        return (
          <FormInput
            control={validation?.control}
            errors={validation?.errors}
            name={String(validation?.name)}
            type={String(validation?.type)}
            placeholder={String(validation?.placeholder)}
          />
        )
      case 'email':
        return (
          <Input
            type={type}
            value={String(value)}
            onChange={handleInputChange}
            className="w-full "
            placeholder={placeholder}
          />
        )
      case 'password':
        return (
          <Input
            type={type}
            value={String(value)}
            onChange={handleInputChange}
            className="w-full "
            placeholder={placeholder}
          />
        )
      case 'image':
        return <Input type="file" accept="image/*" onChange={handleImageUploud} placeholder={placeholder} />
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={handleCheckboxChange}
            className="border rounded outline-none w-[100%]"
          />
        )

      case 'select':
        return (
          <Select onValueChange={(selectedValue) => handleSelectChange(selectedValue)}>
            <SelectTrigger>
              <SelectValue placeholder={formatCapitalize(String(value))} />
            </SelectTrigger>
            <SelectContent>
              {selectOptions?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      default:
        return null
    }
  }

  return <div className="relative w-full">{renderEditableCell()}</div>
}

interface IEditButton<T> {
  row: T
  toggleEditing: (id: string | number) => void
  editing: boolean
  onSave: (row: T) => void
  isLoading?: ILoading | undefined
}

const EditButton = <T extends IEditable>({ row, toggleEditing, editing, onSave, isLoading }: IEditButton<T>) => {
  const handleSave = () => {
    onSave(row)
  }

  return (
    <Button
      disabled={isLoading?.isLoadingUpdate}
      variant="active"
      size="xs"
      onClick={() => (editing ? handleSave() : toggleEditing(row.id))}
      type="button"
    >
      {isLoading?.isLoadingUpdate ? <p>Loading . . .</p> : editing ? 'Simpan' : 'Edit'}
    </Button>
  )
}

export default InlineEditTable
