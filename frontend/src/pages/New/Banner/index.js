import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { MdCameraAlt } from 'react-icons/md';
import api from '~/services/api';

import { Container } from './styles';

export default function Banner() {
  const { defaultValue, registerField } = useField('image');
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const ref = useRef();

  async function handleFileChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'file_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref.current]); // eslint-disable-line

  return (
    <Container>
      <label htmlFor="banner">
        {preview ? (
          <>
            <img src={preview} alt="" />
            <input
              type="file"
              id="banner"
              accept="image/*"
              data-file={file}
              onChange={handleFileChange}
              ref={ref}
            />
          </>
        ) : (
          <>
            <MdCameraAlt size={54} color="rgba(255, 255, 255, .3)" />
            <strong>Selecione a imagem</strong>
            <input
              type="file"
              id="banner"
              accept="image/*"
              data-file={file}
              onChange={handleFileChange}
              ref={ref}
            />
          </>
        )}
      </label>
    </Container>
  );
}
