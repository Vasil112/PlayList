"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  example: string
  exampleRequired: string
  name: string
} 

interface Music {
    name: string;
    vicon: string;
    comp: string;
    vubir: string;
}


export default function Contact() {
    const [name, setName] = useState('');
    const [vicon, setVicon] = useState('');
    const [comp, setComp] = useState('');
    const [vubir, setVubir] = useState('');
    const [playlist, setPlaylist] = useState<Music[]>([])
    const {
    register,
        handleSubmit,
        formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    const handleSubmited = (e: any) => {
        e.preventDefault();   
        const data = { name, vicon, comp, vubir};
        console.log(data);
        setPlaylist([...playlist, {name, vicon, comp, vubir}])
        console.log(playlist);
        e.target.reset()
    }

    const handleClear = e => {
        setName('')
        setVicon('')
        setComp('')
        setVubir('')
    }



    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <div className="border-white border-2 rounded-3xl bg-sky-200 px-20 py-10">
                    {playlist.map((item, key) => (
                        <div key={key}>
                            <div>
                                <span>
                                    {item.vubir}
                                </span>
                            </div>
                            <div className="flex">
                                <Image src="../favicon.ico" alt="" className="w-5"/>
                                <span>
                                    {item.name} - {item.vicon}
                                </span>
                            </div>
                        </div>
                    ))}

                </div>
                <form onSubmit={handleSubmited} onReset={handleClear} className='flex flex-col bg-stone-300 text-slate-900 my-5 mx-10 p-5 w-[600px] h-auto max-w-xl' >
                    <label htmlFor="name">Додати music</label>
                    <input id="name" type="text" value={name} onChange={e => setName(e.target.value)}   
                    />
                    <select name="vubir" className="m-5" id="vubir" value={vubir} onChange={e => setVubir(e.target.value)}>
                        <option value="Рок">Рок</option>
                        <option value="Джаз">Джаз</option>
                        <option value="Кей-Поп">Кей-Поп</option>
                        <option value="Блюз">Блюз</option>
                    </select>
                    <label htmlFor="vicon">Виконавець</label>
                    <input type="text" id="vicon" value={vicon} onChange={e => setVicon(e.target.value)} />

                    <label htmlFor="comp">Композитор</label>
                    <input type="text" id="comp" value={comp} onChange={e => setComp(e.target.value)}/>
                    <div className="flex flex-row py-4 items-center justify-evenly">
                        <button type="submit">Save</button>
                        <button type="reset">Clear</button>
                    </div>
                    
                </form>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* register your input into the hook by invoking the "register" function */}
                    <input defaultValue="test" {...register("example")} />

                    {/* include validation with required or other standard HTML validation rules */}
                    <input {...register("exampleRequired", { required: true })} />
                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && <span>This field is required</span>}

                    <input type="submit" className="text-white" />
                    <input {...register("name", { minLength: 5 })} />
                    {errors.name && <span>This field is required</span>}
                </form>
            </main>
            
        </div>
    );
}
