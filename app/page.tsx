import Upload from './components/Upload'

export default function Home() {
  return (
    <main>
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className='m-3'>Upload Your File Here</h1>
      <Upload></Upload>
    </div>
    </main>
  )
}
