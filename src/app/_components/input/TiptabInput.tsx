import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import TiptapEditor from '../editor/Tiptap';

interface TiptapInputProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
}

export const TiptapInput = <T extends FieldValues>({ control, name }: TiptapInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <TiptapEditor value={field.value} onChange={field.onChange} />
          {error && <p className="text-neonPink mt-1">{error.message}</p>}
        </>
      )}
    />
  );
};