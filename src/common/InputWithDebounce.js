import React, { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { DEBOUNCE_THRESHOLD } from "./constants";

export const InputWithDebounce = (props) => {
    const timeoutHandler = useRef(null);
    const {callBack} = props;

    const handleSearchFilterChange = (event) => {
        if (event.code === "Enter"){
            callBack(event.target.value);
        }else{
            if (timeoutHandler.current) {
                clearTimeout(timeoutHandler.current);
            }
            timeoutHandler.current = setTimeout(() => {
                callBack(event.target.value);
            }, DEBOUNCE_THRESHOLD);
        }
      };

    return (
        <InputGroup className="mb-3">
            <Form.Control
            placeholder="Filter Search"
            onKeyDown={handleSearchFilterChange}
            />
        </InputGroup>
    )
}