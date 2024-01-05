import { useState } from 'react';

export default function Home({ movies }) {
    const [query, setQuery] = useState('');
    const handleChange = (e) => {
        setQuery(e.target.value)
        }
        

  return (

    //input field for search
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search movies..."
        className="border p-2 rounded"
        onchange={handleChange}  
            />
     
    </div>
  );
}
