import * as Dialog from '@radix-ui/react-dialog';
import { Check, GameController } from '@phosphor-icons/react';
import { Input } from '../components/Forms/Input';
import * as Checkbox from '@radix-ui/react-checkbox';
import { useEffect, useState, FormEvent } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from 'axios';


interface Game {
    id: string;
    title: string;

}

export function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)

    console.log(weekDays)

    useEffect(() => {
        axios('http://localhost:3333/games')
            .then(response => {
                setGames(response.data)
            })
    }, [])

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)


        if (!data.name) {
            return;
        }

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })


            alert('Anuncio Criado com Sucesso')

        } catch (err) {
            console.log(err)
            alert('erroo ao criar o anuncio!')

        }
    }


    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed " />
            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] 
          drop-shadow-lg shadow-lg shadow-black/25">
                <Dialog.Title className="text-3xl text-white font-black">Publicar um Anuncio</Dialog.Title>


                <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">

                    <div className="flex flex-col gap-2">


                        <label htmlFor="game" className="font-semibold ">Qual o Game?</label>
                        <select
                            name="game"
                            id="game"
                            className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-400 appearance-none"
                            defaultValue=""
                        >

                            <option disabled value="">Selecione o game que deseja jogar</option>

                            {games.map(game => {
                                return <option key={game.id} value={game.id}>{game.title}</option>

                            })}
                        </select>


                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Seu nome (ou nickname)</label>
                        <Input name="name" id="name" placeholder="Como te chamam dentro do game?"></Input>
                    </div>

                    <div className="grid grid-cols-2 gap-10">

                        <div className="flex flex-col gap-2">
                            <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                            <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO"></Input>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="discord">Qual seu Discord?</label>
                            <Input name="discord" id="discord" placeholder="Usuario#0000"></Input>
                        </div>

                    </div>
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="weekDays">Quando Costuma jogar?</label>

                            <ToggleGroup.Root
                                type='multiple'
                                className='grid grid-cols-4 gap-2'
                                value={weekDays}
                                onValueChange={setWeekDays}
                            >
                                <ToggleGroup.Item
                                    value="0"
                                    title="Domingo"
                                    className={`w-8 h-8 rounded hover:bg-violet-500 ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    D
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="1"
                                    title="Segunda"
                                    className={`w-8 h-8 rounded hover:bg-violet-500 ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="2"
                                    title="Terça"
                                    className={`w-8 h-8 rounded hover:bg-violet-500 ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    T
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="3"
                                    title="Quarta"
                                    className={`w-8 h-8 rounded hover:bg-violet-500 ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="4"
                                    title="Quinta"
                                    className={`w-8 h-8 rounded hover:bg-violet-500 ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="5"
                                    title="Sexta"
                                    className={`w-8 h-8 rounded hover:bg-violet-500 ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="6"
                                    title="Sabado"
                                    className={`w-8 h-8 rounded hover:bg-violet-500 ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    S
                                </ToggleGroup.Item>
                            </ToggleGroup.Root>


                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="hourStart">Qual Horario do Dia?</label>
                            <div className="grid grid-cols-2 gap-2">
                                <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                                <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                            </div>
                        </div>
                    </div>
                    <label className='mt-2 flex gap-2 text-sm items-center'>
                        <Checkbox.Root
                            checked={useVoiceChannel}
                            onCheckedChange={(checked) => {
                                if (checked == true) {
                                    setUseVoiceChannel(true)
                                } else {
                                    setUseVoiceChannel(false)
                                }
                            }}

                            className="bg-zinc-900 w-6 h-6 rounded p-1"
                        >
                            <Checkbox.Indicator>
                                <Check className='w-4 h-4 text-emerald-400' />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz

                    </label>

                    <footer className='mt-4 flex justify-end gap-4'>
                        <Dialog.Close
                            className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-700'
                        >
                            Cancelar
                        </Dialog.Close>
                        <button className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600' type="submit">
                            <GameController size={24} />
                            Encontrar o duo</button>
                    </footer>
                </form>


            </Dialog.Content>

        </Dialog.Portal>

    )
}

