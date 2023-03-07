import { useState } from 'react'
import styles from '../styles/Home.module.scss'

type Item = {
  id: number
  name: string
  price: number
}

const items: Item[] = [
  { id: 1, name: 'Item 1', price: 100 },
  { id: 2, name: 'Item 2', price: 200 },
  { id: 3, name: 'Item 3', price: 300 },
]

const SearchButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className={styles.searchButton} onClick={onClick}>
      Search
    </button>
  )
}

export default function Sample() {
  const [data, setData] = useState<Item[]>([])
  const [showTable, setShowTable] = useState(false)

  const handleSearch = () => {
    setData(items)
    setShowTable(true)
  }

  return (
    <div className={styles.container}>
      <h1>Product List</h1>
      <SearchButton onClick={handleSearch} />
      {showTable && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}