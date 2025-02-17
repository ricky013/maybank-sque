/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { Suspense, lazy } from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Skeleton from './components/global/atoms/Skeleton'
import './index.css'

// react query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false // default: true
    }
  }
})

// import layout
import ClientLayout from './container/ClientLayout'

const NotFound = lazy(() => import('../src/components/global/organism/NotFound'))

// Import halaman client dengan lazy loading
const ClientHome = lazy(() => import('./pages/home'))
const ClientLayanan = lazy(() => import('./pages/layanan'))
const ClientBooking = lazy(() => import('./pages/booking'))
const ClientDomisili = lazy(() => import('./pages/domisili'))
const ClientCabang = lazy(() => import('./pages/cabang'))
const ClientDetailLayanan = lazy(() => import('./pages/layananDetail'))
const ClientTiket = lazy(() => import('./pages/tiket'))

// Import Halaman Counter

// Konfigurasi routing dengan role-based access
const app = createBrowserRouter([
  {
    path: '/',
    element: (
      <ClientLayout>
        <ClientHome />
      </ClientLayout>
    )
  },
  {
    path: '/domisili',
    element: (
      <ClientLayout>
        <ClientDomisili />
      </ClientLayout>
    )
  },
  {
    path: '/cabang/:id',
    element: (
      <ClientLayout>
        <ClientCabang />
      </ClientLayout>
    )
  },
  {
    path: '/layanan/:id',
    element: (
      <ClientLayout>
        <ClientLayanan />
      </ClientLayout>
    )
  },
  {
    path: '/detail/layanan/:id',
    element: (
      <ClientLayout>
        <ClientDetailLayanan />
      </ClientLayout>
    )
  },
  {
    path: '/detail/layanan/booking/:id',
    element: (
      <ClientLayout>
        <ClientBooking />
      </ClientLayout>
    )
  },
  {
    path: '/tiket',
    element: (
      <ClientLayout>
        <ClientTiket />
      </ClientLayout>
    )
  },
  //  handle jika route tidak ditemukan
  {
    path: '*',
    element: <NotFound />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <Suspense fallback={<Skeleton />}>
        <RouterProvider router={app} />
      </Suspense>
    </React.StrictMode>
    {/* <ReactQueryDevtools /> */}
  </QueryClientProvider>
)
