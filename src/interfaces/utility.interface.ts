export interface IParams {
  page: number
  perPage: number
}

export interface ISearchDate {
  tanggalAwal: string
  tanggalAkhir: string
}

export interface INavigateAction {
  label: string
  redirect?: string
}

export interface IPagination {
  currentPage: number
  limit: number
  totalPages: number
  totalItems: number
}

export interface ISelectOptions {
  value: string
  label: string
}

export interface ILoading {
  isLoadingUpdate: boolean
  isLoadingDelete: boolean
}
