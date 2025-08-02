import React, { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { toast } from 'sonner';

const MessageForm = () => {
const [message, setMessage] = useState<string>("");
const [delay, setDelay] = useState<number>(10);
const [isSending, setIsSending] = useState<boolean>(false);
const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout> | null>(null);
const [sentMessage, setSentMessage] = useState<string>("");
const [countdown, setCountdown] = useState<number>(delay);
const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);


const handleSend = () => {
  setIsSending(true);
  setCountdown(delay);

  const interval = setInterval(() => {
  setCountdown(prev => {
    if (prev <= 1) {
      clearInterval(interval);
      return 0;
    }
    return prev - 1;
  });
}, 1000);

setIntervalId(interval);


  const id = setTimeout( () => {
    setSentMessage(message);
    setMessage("");
    setIsSending(false);
    toast.success("Message sent!");
}, delay * 1000)
  setTimerId(id);
}

const handleCancel = () =>{
  if(timerId) clearTimeout(timerId);
  if (intervalId) clearInterval(intervalId);
  setIsSending(false);
  setCountdown(delay);
}

  return (
    <div className='max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-sm bg-white space-y-4'>
        <h2 className='text-2xl font-bold text-gray-800 '>Dm Delay Button</h2>
        <label htmlFor='message' className='sr-only'>Message</label>
        <Textarea
        id='message'
        className='w-full p-2 border rounded'
        placeholder='Type your msg...'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        />
        <Input
        type='number'
        placeholder='Dealy in SECONDS'
        value={delay}
        onChange={(e) => setDelay(Number(e.target.value))}
        disabled={isSending}
        />
        
        {isSending? (
          <Button className='w-full' variant='destructive' onClick={handleCancel}>
        Cancel Sending
        </Button>
          
        ):(
        <Button className='w-full' onClick={handleSend} disabled={!message.trim()}>
        Send With Delay
        </Button>
        )}

        {isSending && (
          <p className='text-sm text-gray-600 text-center'>
            Sending in {countdown} second{countdown !== 1 ? 's' : ''}
          </p>
        )}


        {sentMessage && (
          <div className='bg-green-100 border rounded p-3 text-green-900' >
            <p className='font-semibold'>Message sent</p>
            <p>{sentMessage}</p>
            

          </div>
          
          )
        }
    </div>
    
  )
}

export default MessageForm