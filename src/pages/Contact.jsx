import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { db } from '../firebase.config';

function Contact() {
    const [message, setMessage] = useState('');
    const [owner, setOwner] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const params = useParams();

    useEffect(() => {
        const getOwner = async () => {
            const docRef = doc(db, 'users', params.ownerId)
            const selectedDoc = await getDoc(docRef)

            if(selectedDoc.exists()) {
                setOwner(selectedDoc.data())
            } else {
                toast.error('Could not get owner details!')
            }
        }

        getOwner()

    }, [params.ownerId])

    

  return (
    <div className="page__container">
        <header>
            <p className="page__header">Contact Owner</p>
        </header>

        {owner !== null && (
            <main>
                <div className="contact__owner">
                    <p className="owner__name">{owner.name}</p>
                </div>
                <form className="message__form">
                    <div className="message">
                        <label className="message__label">Message</label>
                        <textarea 
                            name="message" 
                            id="message" 
                            value={message}
                            className="message__textarea"
                            onChange={onChange}
                        ></textarea>
                    </div>
                </form>
            </main>
        )}
    </div>
  )
}

export default Contact