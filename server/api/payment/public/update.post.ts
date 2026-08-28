import { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
    try {
        const auth = (await getAuth(event)) as IAuth;
        const body = await readBody(event);

        const bankName = body.bankName?.trim();
        const accountNumber = body.accountNumber?.replace(/\s+/g, "").trim();
        const accountName = body.accountName?.trim();
        const address = body.address?.trim();

        if (!bankName || bankName.length < 2)  throw "invalidBankName";

        if (!/^\d{6,20}$/.test(accountNumber)) throw "invalidAccountNumber";
        if (!accountName || accountName.length < 3) throw "invalidAccountHolderName";
        if (!address || address.length < 5) throw "invalidAddress";

        await DB.BankAccount.findOneAndUpdate(
            { user: auth._id },
            {
                user: auth._id,
                bankName,
                accountNumber,
                accountName,
                address,
            },
            {
                upsert: true,
                new: true,
            }
        );

        return resp(event, {
            message: "updateSuccess",
        });
    } catch (e: any) {
        return resp(event, {
            code: 400,
            message: e?.message || e.toString(),
        });
    }
});