export const customStylesInlineDataTable = (headerBackgroundColor: string) => ({
  headCells: {
    style: {
      fontWeight: '500',
      borderInline: '1px solid rgba(0,0,0,.1)', // Add right border for separation
      fontSize: '.8rem',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0px',
      margin: '0px',
      minHeight: '45px !important',
      whiteSpace: 'nowrap'
    }
  },
  headRow: {
    style: {
      backgroundColor: headerBackgroundColor,
      borderRadius: '8px',
      overflow: 'hidden',
      // minHeight: '45px !important',
      display: 'flex',
      alignItems: 'center'
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
})
