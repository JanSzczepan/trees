import { ProgressBar } from 'react-bootstrap'

type AddTreeHeaderProps = {
   title: string
   progress: number
}

function AddTreeHeader({ title, progress }: AddTreeHeaderProps) {
   return (
      <>
         <h3 className='mb-4'>{title}</h3>
         <ProgressBar
            now={progress}
            label={progress ? `${progress.toFixed(0)}%` : ''}
         />
      </>
   )
}

export default AddTreeHeader
