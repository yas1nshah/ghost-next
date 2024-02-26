"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { ClipboardCopy } from 'lucide-react'
import { toast } from "sonner"

const CopyToClipboard = ({ text, msg }: { text: string, msg: string }) => {
  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          toast(msg);
        })
        .catch((err) => {
          console.error('Failed to copy:', err);
          // Fallback: prompt the user to copy manually
          prompt('Press Ctrl+C (Cmd+C on Mac) to copy the text', text);
        });
    } else {
      // Fallback: prompt the user to copy manually
      prompt('Press Ctrl+C (Cmd+C on Mac) to copy the text', text);
    }
  };

  return (
    <Button variant={'outline'} onClick={copyToClipboard}>
      <ClipboardCopy className='w-4 h-4 mr-2' /> Copy
    </Button>
  );
};


export default CopyToClipboard