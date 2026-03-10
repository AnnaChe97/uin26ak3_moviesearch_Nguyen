export default function  History({history, setSearch}){

    const handleChange = (e)=>{
        setSearch(e.target.value)
    }

    if(!history || history.length === 0){
        return null
    }

    return (
        <label>
            Tidligere søk:
            <select onChange={handleChange}>
                <option value="">Velg tidligere søk</option>
                {history?.map((item, i) => <option key={i}  value={item}>{item}</option>)}
            </select>
        </label>
    )
}
