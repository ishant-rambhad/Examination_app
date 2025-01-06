import Image from "next/image";
const Marquee = () => {
    return (
        <div>
            <div class="overflow-hidden bg-transparent shadow-sm p-4">
                <div class="marquee-content flex gap-4 items-center animate-marquee">
                    <div class="w-48 h-32">
                        <Image width = {100} height = {100} src="/images/stripe.png" alt="Breaking News" class="w-full h-full object-cover rounded" />
                    </div>

                    <div class="w-48 h-32">
                        <Image width = {300} height = {150} src="/images/ibm.png" alt="Stock Update" class="w-full h-full object-cover rounded" />
                    </div>

                    <div class="w-48 h-32">
                        <Image width = {100} height = {100} src="/images/siemens.png" alt="Weather Alert" class="w-full h-full object-cover rounded" />
                    </div>
                    
                </div>
            </div>

        </div>
    )
}

export default Marquee;