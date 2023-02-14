export type AddTreePhase = 'info' | 'location' | 'summary'

export default function getAddTreePhase(): AddTreePhase {
   const addTreePhase =
      localStorage.getItem('addTreePhase') &&
      JSON.parse(localStorage.getItem('addTreePhase')!)

   return addTreePhase || 'info'
}
