"use client";

export const ProductsCartForm = () => {
    return (
        <div
            className="w-full max-w-100 border border-[#ad852f]/30 bg-[#ad852f]/5 p-3"
        >
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium primary-text mb-1">
                        الاسم الكامل
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ad852f]"
                        placeholder="أدخل اسمك الكامل"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium primary-text mb-1">
                        البريد الإلكتروني
                    </label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ad852f]"
                        placeholder="أدخل بريدك الإلكتروني"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium primary-text mb-1">
                        الهاتف
                    </label>
                    <input
                        type="tel"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ad852f]"
                        placeholder="أدخل رقم هاتفك"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium primary-text mb-1">
                        العنوان
                    </label>
                    <textarea
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ad852f]"
                        rows={3}
                        placeholder="أدخل عنوانك"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full font-medium py-2 rounded-md primary-bg cursor-pointer outline-[#ad852f]/60 transition"
                >
                    إرسال
                </button>
            </form>
        </div>
    )
}
