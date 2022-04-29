
/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material'
// Local
import Context from '../Context'

import CreateChannel from './CreateChannel';

const styles = {
  root: {
  },
  channel: {
    color: 'dark',
    padding: '.2rem .5rem',
    whiteSpace: 'nowrap', 
  },
  createChannel: {
    color: 'white',
    padding: '.2rem .5rem',
    fontWeight: 'bold',
    whiteSpace: 'nowrap', 
  }
}

const Channels = () => {
  const {channels, setChannels, oauth} = useContext(Context)
  const deleteChannel = async (id) => {
    await axios.delete(`http://localhost:3001/channels/${id}` ,  {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      }
    })
    channels.splice(id,1)
    setChannels([...channels])
  }
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
          <Button color="error" onClick={ async () => {await deleteChannel(channel.id)}}>Delete</Button>
        </li>
      ))}
      <li style={styles.createChannel}>
          <CreateChannel>+ Create Channel</CreateChannel>
        </li>
    </ul>
  );
}

export default Channels
