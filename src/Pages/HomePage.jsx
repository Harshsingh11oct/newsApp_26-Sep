import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import { useSearchParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function HomePage() {
  let [articles, setArticles] = useState([])
  let [totalResults, setTotalResults] = useState(0)
  let [page, setPage] = useState(1)


  async function getApiData(q, language) {
    let response = await fetch(`https://newsapi.org/v2/everything?q=${q}&language=${language}&page=1&pageSize=24&from=2025-08-24&sortBy=publishedAt&apiKey=342bc1d80db54beda62abd50388ba635`)
    response = await response.json()
    console.log(response);
    if (response.status === 'ok') {
      setArticles(response.articles)
      setTotalResults(response.totalResults)
    }
  }

  async function fetchMoreData() {
    setPage(page + 1)
    let response = await fetch(`https://newsapi.org/v2/everything?q=${q}&language=${language}&page=${page}&pageSize=24&from=2025-08-24&sortBy=publishedAt&apiKey=342bc1d80db54beda62abd50388ba635`)
    response = await response.json()
    console.log(response);
    if (response.status === 'ok') {
      setArticles(articles.concat(response.articles))
    }
  }

  let [q, setQ] = useState('All')
  let [language, setLanguage] = useState('hi')
  let [searchParams] = useSearchParams();

  useEffect(() => {
    let q = searchParams.get('q') ?? 'All'
    setQ(q)
    let language = searchParams.get('language') ?? 'hi'
    setLanguage(language)
    getApiData(q, language)
  }, [searchParams])

  return (
    <div className='container-fluid my-3 '>
      <h5 className='text-center bg-primary text-light p-2 text-capitalize'>{q} News Article</h5>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<div className='my-5 text-center'>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>}>
  <div className='row'>
    {articles.map((item, index) => {
      return <NewsItem
        key={index}
        title={item.title}
        description={item.description}
        pic={item.urlToImage ? item.urlToImage : '/public/images/Unavailable_Image.png'}
        url={item.url}
        date={item.publishedAt}
        source={item.source.name}
      />
    })
    }
  </div>
      </InfiniteScroll >
    </div >
  )
}
