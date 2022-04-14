
/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// Local
import Context from '../Context'

const styles = {
  root: {
  },
  channel: {
    color: '#fff',
    padding: '.2rem .5rem',
    whiteSpace: 'nowrap', 
  }
}

const Channels = () => {
  const {channels, setChannels, oauth} = useContext(Context)
  const navigate = useNavigate();
  // Fetch channels from back-end
  useEffect( () => {
    const fetch = async () => {
      try{
        const {data: channels} = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        setChannels(channels)
      } catch(err) {
        console.error(err)
      }
    }
    fetch()
  }, [oauth, setChannels])
  useEffect( () => {
    const fetch = async () => {
      try {
        const {data: channels} = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        setChannels(channels)
      } catch(err) {
        console.error(err)
      }
    }
    fetch()
  }, [setChannels, oauth.access_token])
  return (
    <ul style={styles.root}>
      { channels.map( (channel, i) => (
        <li key={i} css={styles.channel}>
          <Link
            component={RouterLink}
            to={`/channels/${channel.id}`}
            onClick={ (e) => {
              e.preventDefault()
              navigate(`/channels/${channel.id}`)
            }}
          >
            {channel.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Channels
