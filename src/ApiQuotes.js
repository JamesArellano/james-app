import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ApiQuotes.css';

const ApiQuotes = () => {

    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');  
    const [fadeProp, setFadeProp] = useState({
        fade: 'fade-in-text',
    });

    const quoteAPI = async () => {
        let arrayOfQuotes = [];
        try {
            const data = await axios.get('https://api.quotable.io/random')
            arrayOfQuotes = data.data;
        } catch (error) {
            console.log(error)
        }

        try {
            setQuote(arrayOfQuotes.content);
            setAuthor(arrayOfQuotes.author);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        quoteAPI();
    }, []);
 
    useEffect(() => {
        const quoteTimer = setTimeout(() => {
            quoteAPI();
            setFadeProp({
                fade: 'fade-in-text'
           })
        }, 15000);
        const fadeTimer = setTimeout(() => {
            if (fadeProp.fade === 'fade-in-text') {
               setFadeProp({
                    fade: 'fade-out-text'
               })
            } 
         }, 14000);
        return () => clearTimeout(quoteTimer, fadeTimer);
    }, [quote]);

    return (
        <div className='bgImg'>
            <div className='content-box'>
                <h1 className={fadeProp.fade}>"{quote}"</h1>
                <p className={fadeProp.fade}>- {author}</p>
            </div>
        </div>
    )
}

export default ApiQuotes;
