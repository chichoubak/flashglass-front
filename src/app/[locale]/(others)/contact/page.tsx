'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { createRequest } from '@/api/bo/auth'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"


export default function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        description: ''
    })
    const router = useRouter()
    const [open, setOpen] = useState(false) // État pour la modale


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
        await createRequest(fetch, {
            first_name: formData?.firstName,
            last_name: formData?.lastName,
            email: formData?.email,
            phone: formData?.phone,
            description: formData?.description
        });
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        router.push('/')
    }

    return (
        <div className="w-[95%] sm:w-[80%] lg:w-[60%] mx-auto max-w-[900px] my-10 p-6 rounded-[1.5rem] lg:rounded-[2rem] bg-white border shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-6 text-primary">Contactez-nous</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        Prénom *
                    </label>
                    <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        placeholder="Votre prénom"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="mt-1"
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Nom *
                    </label>
                    <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        placeholder="Votre nom de famille"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="mt-1"
                    />
                </div>

                {/* Email */}
                <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email *
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Votre adresse email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1"
                    />
                </div>

                {/* Phone */}
                <div className="sm:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Nous vous rappelrons dans le numéro suivant: *
                    </label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Votre numéro de téléphone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1"
                    />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Qu'est ce que vous desirez ?
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Votre message"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full h-32 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mt-1"
                    />

                </div>

                {/* Bouton de soumission */}
                <div className="sm:col-span-2">
                    <Button type="submit" variant="outline" className="w-full text-primary hover:text-white hover:bg-primary">
                    Envoyer la demande
                    </Button>
                </div>
            </form>
            {/* Pop-up de succès */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md rounded-xl">
                    <DialogHeader>
                        <DialogTitle className="text-green-600 text-lg font-semibold">Succès !</DialogTitle>
                    </DialogHeader>
                    <div className="text-gray-700">
                        Votre demande a été soumise avec succès. Nous vous contacterons bientôt !
                    </div>
                    <DialogFooter>
                        <Button onClick={handleClose} className="w-full bg-primary text-white">
                            OK
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
