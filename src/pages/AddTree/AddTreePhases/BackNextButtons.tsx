import { Button, Stack } from 'react-bootstrap'

type BackNextButtonsProps = {
   handleBack: () => void
   handleNext: () => void
   disabled: boolean
}

function BackNextButtons({
   handleBack,
   handleNext,
   disabled,
}: BackNextButtonsProps) {
   return (
      <Stack
         gap={2}
         direction='horizontal'
         className='mt-4'
      >
         <Button
            variant='outline-secondary'
            onClick={handleBack}
         >
            Back
         </Button>
         <Button
            variant='primary'
            onClick={handleNext}
            disabled={disabled}
         >
            Next
         </Button>
      </Stack>
   )
}

export default BackNextButtons
