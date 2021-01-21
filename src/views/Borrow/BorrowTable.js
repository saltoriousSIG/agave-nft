import React, { useMemo } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom'
import { useTable, useSortBy } from 'react-table'
import BasicTable from '../../components/BasicTable';
import { marketData } from '../../utils/constants';

function BorrowTable({ activeType, history }) {
  const data = useMemo(
    () => {
      if (activeType === 'All') {
        return marketData;
      }

      return marketData.slice(0, 3);
    },
    [activeType]
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Asset',
        accessor: 'name',
        Cell: row => {
          return (
            <div>
              <img src={row.row.original.img} alt="" width="35" height="35" />
              <span>{row.value}</span>
            </div>
          )
        }
      },
      {
        Header: 'Available to borrow',
        accessor: 'wallet_balance',
        Cell: row => (
          <div>
            <span className="value">{row.value} {row.row.original.name}</span>
          </div>
        )
      },
      {
        Header: 'Variable APR',
        accessor: 'variable_borrow_apr',
        Cell: row => (
          <div className="value-section">
            <span className="value blue">{row.value}</span> %
          </div>
        )
      },
      {
        Header: 'Stable APR',
        accessor: 'stable_borrow_apr',
        Cell: row => (
          <div className="value-section">
            <span className="value pink">{row.value}</span> %
          </div>
        )
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <BasicTable>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className="header-column">
                    <span className={!column.isSorted ? '' : column.isSortedDesc ? 'desc' : 'asc'}>
                      {column.render('Header')}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} onClick={() => history.push(`/borrow/${row.values.name}`)} key={index}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </BasicTable>
  )
}

export default compose(withRouter)(BorrowTable);