import React, { InputHTMLAttributes, ChangeEvent } from 'react';
import cn from 'classnames';

import type from './Input.module.css';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  className?: string;
  onChange: (value: string) => void;
}

const Input = (props: Props) => {
  const { className, children, onChange, ...rest } = props;

  const rootClassName = cn(type.root, {}, className);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
    
    return null;
  };

  return (
    <label>
      <input
        className={rootClassName}
        onChange={handleOnChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
    </label>
  );
};

export default Input;