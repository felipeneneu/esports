import { MagnifyingGlassPlus } from "@phosphor-icons/react/dist/icons/MagnifyingGlassPlus";
import * as Dialog from '@radix-ui/react-dialog';

export function ProcureSeuDuo() {
    return (
        <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">

            <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
                <div>
                    <strong className="text-2xl text-white font-black block">Não encontrou seu duo?</strong>
                    <span className="text-zinc-400">Publique um anúncio para encontrar novos players!</span>
                </div>

                <Dialog.Trigger className="py-4 px-3 bg-violet-500 hover:bg-violet-800 text-white rounded flex items-center gap-3">
                    <MagnifyingGlassPlus size={24} />
                    Publicar anúncio
                </Dialog.Trigger>

            </div>

        </div>
    )
}