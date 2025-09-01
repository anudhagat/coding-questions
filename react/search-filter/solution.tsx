import * as React from "react"

const items = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Fig",
  "Grape",
  "Honeydew",
  "Lemon",
  "Mango",
  "Nectarine",
  "Orange",
  "Papaya",
  "Raspberry",
  "Strawberry",
  "Watermelon",
]

export default function SearchFilter() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [filteredItems, setFilteredItems] = React.useState(items)

  const handleChange = (e) => {
    const searchTerm = e.target.value
    setSearchTerm(searchTerm)
    const result = items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredItems(result)
  }
  return (
    <div>
      <h1>Search Filter</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
