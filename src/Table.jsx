import './Table.css'
import { useEffect, useState } from 'react'
import { BsThreeDotsVertical, BsFilter } from 'react-icons/bs'
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai'
import { FiDownloadCloud } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import axios from 'axios'
 
const Table = () => {
    const [coins, setCoins] = useState([])
    const [newData, setNewData] = useState([])
    const [search, setSearch] = useState('')
    const [sorted, setSorted] = useState({sorted: 'id', reversed: false})
    const [arrow, setArrow] = useState({id: false, name: false, rank: false, price: false, percent_change: false, price_btc: false, market_cap: false})
    const [highlight, setHighlight] = useState('')
    const [page, setPage] = useState(1)
    const [error, setError] = useState('')
    
    useEffect(()=>{
        coinData()
        //eslint-disable-next-line
    }, [])

    const coinData = async () =>{
        const url = "https://api.coinlore.net/api/tickers/"
        const cdata = await axios.get(url)
        if(cdata){
            setCoins(cdata.data.data)
            setNewData(cdata.data.data)
        }else{
            setError('Unable to fetch data!')
        }
    }

    const handleSearch = (e)=>{
        setSearch(e.target.value)
        console.log(typeof(search));
        if(!/\d/.test(search)){
            const data = coins.filter((event)=>{
                if(e.target.value ===""){
                    return event
                } else if(event.name.toLowerCase().startsWith(search.toLowerCase())){
                    return event
                    }
                })
                setNewData(data)
                setSearch(e.target.value)
            }
            else{
                const data = coins.filter((event)=>{
                    if(e.target.value ===""){
                        return event
                    } else if(event.id.startsWith(search)){
                        return event
                    }
                })
                setNewData(data)
                setSearch(e.target.value)
            }
    }

    const sortbyid = (index)=>{
        setSorted({sorted: 'id', reversed: !sorted.reversed})
        const copyData = [...newData]
        arrow.id == true ? setArrow({id:false}) : setArrow({id:true})
        setHighlight(index)
        copyData.sort((newDataA, newDataB) =>{
            if(sorted.reversed){
                return newDataA.id - newDataB.id
            }
            return newDataB.id - newDataA.id
        })
        setNewData(copyData)
    }

    const sortbyname = (index)=>{
        setSorted({sorted: 'nameid', reversed: !sorted.reversed})
        const copyData = [...newData]
        arrow.name == true ? setArrow({name:false}) : setArrow({name:true})
        setHighlight(index)
        copyData.sort((newDataA, newDataB) =>{
            if(sorted.reversed){
                return newDataB.nameid.localeCompare(newDataA.nameid)
            }
            return newDataA.nameid.localeCompare(newDataB.nameid)
        })
        setNewData(copyData)
    }
    
    const sortbyrank = (index)=>{
        setSorted({sorted: 'rank', reversed: !sorted.reversed})
        const copyData = [...newData]
        arrow.rank == true ? setArrow({rank:false}) : setArrow({rank:true})
        setHighlight(index)
        copyData.sort((newDataA, newDataB) =>{
            if(sorted.reversed){
                return newDataA.rank - newDataB.rank
            }
            return newDataB.rank - newDataA.rank
        })
        setNewData(copyData)
    }
    const sortbyprice = (index)=>{
        setSorted({sorted: 'price_usd', reversed: !sorted.reversed})
        const copyData = [...newData]
        arrow.price == true ? setArrow({price:false}) : setArrow({price:true})
        setHighlight(index)
        copyData.sort((newDataA, newDataB) =>{
            if(sorted.reversed){
                return newDataA.price_usd - newDataB.price_usd
            }
            return newDataB.price_usd - newDataA.price_usd
        })
        setNewData(copyData)
    }
    const sortbypercentchange = (index)=>{
        setSorted({sorted: 'percent_change_24h', reversed: !sorted.reversed})
        const copyData = [...newData]
        arrow.percent_change == true ? setArrow({percent_change:false}) : setArrow({percent_change:true})
        setHighlight(index)
        copyData.sort((newDataA, newDataB) =>{
            if(sorted.reversed){
                return newDataA.percent_change_24h - newDataB.percent_change_24h
            }
            return newDataB.percent_change_24h - newDataA.percent_change_24h
        })
        setNewData(copyData)
    }
    const sortbypricebtc = (index)=>{
        setSorted({sorted: 'price_btc', reversed: !sorted.reversed})
        const copyData = [...newData]
        arrow.price_btc == true ? setArrow({price_btc:false}) : setArrow({price_btc:true})
        setHighlight(index)
        copyData.sort((newDataA, newDataB) =>{
            if(sorted.reversed){
                return newDataA.price_btc - newDataB.price_btc
            }
            return newDataB.price_btc - newDataA.price_btc
        })
        setNewData(copyData)
    }
    const sortbymarket = (index)=>{
        setSorted({sorted: 'market_cap_usd', reversed: !sorted.reversed})
        const copyData = [...newData]
        arrow.market_cap == true ? setArrow({market_cap:false}) : setArrow({market_cap:true})
        setHighlight(index)
        copyData.sort((newDataA, newDataB) =>{
            if(sorted.reversed){
                return newDataA.market_cap_usd - newDataB.market_cap_usd
            }
            return newDataB.market_cap_usd - newDataA.market_cap_usd
        })
        setNewData(copyData)
    }


  return (
    <div className='container my-5'>
        <div className="container d-flex p-3 head">
            <div className="box0 d-flex">
                <h4>Headlines</h4>
                <span>Lable text or value</span>
                <div className="box f-flex align-items-center flex-row py-1 mx-2">
                    <AiOutlineSearch className='symbol sym2' color='grey' />
                    <input className='search mx-1' onChange={handleSearch} value={search} type="search" placeholder='Search' />
                </div>
            </div>
            <div className="box2 d-flex">
                <div className='mx-2'><RiDeleteBinLine className='symbol' /><span className='mx-1'>Delete</span></div>
                <div className='mx-2'><BsFilter className='symbol' /><span className='mx-1'>Filters</span></div>
                <button className='btn border border-tertiary rounded mx-1'><FiDownloadCloud className='symbol' /><span className='mx-1'>Export</span></button>
                <button className='btn btn-primary mx-1'><AiOutlinePlus color='white' className='symbol' /><span className='mx-1 text-white'>Add new CTA</span></button>
                <BsThreeDotsVertical className='sym3' />
            </div>
        </div>
        <table className="table border-secondary">
            <thead className='thead-light'>
                <tr>
                    <td scope='col'><input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" /></td>
                    <td scope="col" className={highlight === 1 ? `text-primary` : `text-secondary`} onClick={()=>sortbyid(1)}>ID {arrow.id ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}</td>
                    <td scope="col" className={highlight === 2 ? `text-primary` : `text-secondary`} onClick={()=>sortbyname(2)}>Name {arrow.name ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}</td>
                    <td scope="col" className={highlight === 3 ? `text-primary` : `text-secondary`} onClick={()=>sortbyrank(3)}>Rank {arrow.rank ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}</td>
                    <td scope="col" className={highlight === 4 ? `text-primary` : `text-secondary`} onClick={()=>sortbyprice(4)}>Price(USD) {arrow.price ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}</td>
                    <td scope="col" className={highlight === 5 ? `text-primary` : `text-secondary`} onClick={()=>sortbypercentchange(5)}>Percent Change(24) {arrow.percent_change ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}</td>
                    <td scope="col" className={highlight === 6 ? `text-primary` : `text-secondary`} onClick={()=>sortbypricebtc(6)}>Price(BTC) {arrow.price_btc ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}</td>
                    <td scope="col" className={highlight === 7 ? `text-primary` : `text-secondary`} onClick={()=>sortbymarket(7)}>Market Cap(USD) {arrow.market_cap ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}</td>
                    <td scope="col"></td>
                </tr>
            </thead>
            <tbody>
                {
                    newData && newData.slice(page*10-10,page*10).map((coin, index) => {
                        return(
                            <tr key={index}>
                                <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></td>
                                <td style={{fontWeight: '500'}}>{coin.id}</td>
                                <td className='text-secondary'>{coin.name}</td>
                                <td className='text-secondary'>{coin.rank}</td>
                                <td className='text-secondary'>{coin.price_usd}</td>
                                <td className='text-secondary'>{coin.percent_change_24h}</td>
                                <td className='text-secondary'>{coin.price_btc}</td>
                                <td className='text-secondary'>{coin.market_cap_usd}</td>
                                <td className='text-secondary'><BsThreeDotsVertical /></td>
                            </tr>

                        )
                    })
                }
                {error && <p>{error}</p> }
            </tbody>
        </table>
        <div className="container d-flex px-3 footer">
            <div className='foot text-secondary'>{page*10-9} - {page*10} of {newData.length}</div>
            <div className='foot d-flex'>
                <button className={page=== 1 ? 'btn border border-tertiary rounded mx-1 disabled' : 'btn border border-tertiary rounded mx-1' } onClick={()=> setPage(page-1)}>Previous</button>
                <button className={newData.length<=page*10 ? 'btn border border-tertiary rounded mx-1 disabled' : 'btn border border-tertiary rounded mx-1'} onClick={()=> setPage(page+1)}>Next</button>
            </div>
        </div>
    </div>
  )
}

export default Table
