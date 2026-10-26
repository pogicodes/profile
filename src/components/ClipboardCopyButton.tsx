'use client';
import {useEffect, useState} from 'react';
import {FaCheck as CheckIcon} from '@react-icons/all-files/fa/FaCheck';
import {FaCopy as CopyIcon} from '@react-icons/all-files/fa/FaCopy';

async function copyToClipboard(value: string) {
  try {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(value);
      return true;
    }

    const element = document.createElement('textarea');
    element.value = value;
    document.body.append(element);
    element.select();
    document.execCommand('copy');
    element.remove();

    return true;
  } catch {
    return false;
  }
}

interface ClipboardCopyButtonProps {
  value: string;
}

enum State {
  Idle = 'idle',
  Copy = 'copy',
  Copied = 'copied',
}

function ClipboardCopyButton({value}: ClipboardCopyButtonProps) {
  const [state, setState] = useState<State>(State.Idle);

  useEffect(() => {
    async function transition() {
      switch (state) {
        case State.Copy: {
          await copyToClipboard(value);
          setState(State.Copied);
          break;
        }
        case State.Copied: {
          setTimeout(() => {
            setState(State.Idle);
          }, 2000);
          break;
        }
        default:
          break;
      }
    }
    void transition();
  }, [state, value]);

  return (
    <button
      type="button"
      className="flex items-center gap-1.5 font-mono text-xs text-white/55 transition-colors hover:text-white"
      onClick={() => setState(State.Copy)}
    >
      {state === State.Copied ? (
        <CheckIcon aria-hidden className="text-terminal-accent" size={12} />
      ) : (
        <CopyIcon aria-hidden size={12} />
      )}
      <span className="text-xs">
        {state === State.Copied ? 'copied' : 'copy'}
      </span>
    </button>
  );
}

export default ClipboardCopyButton;
