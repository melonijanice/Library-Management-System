import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { getInputUtilityClass } from "@mui/material";

export default function MultipleSelectAuthors(props) {
  const [personName, setPersonName] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [names, setNames] = useState([]);

  useEffect(() => {
    console.log("authors", props.authors);
  if(props.authors!==undefined)
    {
     console.log("authors", props.authors);
    let InitialAuthors=[]
    console.log("Initial Authors",InitialAuthors)
    props.authors.map(author=>InitialAuthors.push(author._id))
    setPersonName(InitialAuthors) 
    } 
    axios
      .get("http://localhost:8000/api/authors", {
        withCredentials: true,
      })
      .then((res) => {
        setNames(res.data);
        setLoaded(true)
      })
      .catch((err) => {});
  }, []);

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    console.log(options);
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        console.log(options[i].value);
        value.push(options[i].value);
      }
    }
    setPersonName(value);
    props.onChangeProp(value);
  };

  return (
    <div>
      {loaded &&
      (<div>
        <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
          <InputLabel shrink htmlFor="select-multiple-native">
            Authors
          </InputLabel>
          <Select
            multiple
            native
            value={personName}
            // @ts-ignore Typings are not considering `native`
            onChange={handleChangeMultiple}
            label="Native"
            inputProps={{
              id: "select-multiple-native",
            }}
          >
            {names.map((name) => (
              <option key={name._id} value={name._id}>
                {name.firstName + " " + name.lastName}
              </option>
            ))}
          </Select>
        </FormControl>
        <select id="id-name" multiple="multiple">
        </select>
      </div>)}

    </div>
  );
}
