import { MaskitoElementPredicate, MaskitoOptions, maskitoTransform } from "@maskito/core";
import { MaskitoDateMode, maskitoDateOptionsGenerator, maskitoParseDate, maskitoStringifyDate } from "@maskito/kit";

const dateMask = maskitoDateOptionsGenerator({ mode: 'dd/mm/yyyy', separator: '/'});
const maskitoElement: MaskitoElementPredicate = async(el) => 
    (el as HTMLIonInputElement).getInputElement();

const parseDateMask = (date: string, mode: MaskitoDateMode = 'dd/mm/yyyy') => {
    return maskitoParseDate(date, { mode })
};

const formatDateMask = (date: Date) => {
    return maskitoStringifyDate(date, {mode: 'dd/mm/yyyy', separator: '/'});
};
export const phoneMask: MaskitoOptions = {
    mask: [
            '(', /\d/, /\d/, ')', ' ',
            /\d/, /\d/, /\d/, /\d/, /\d/,
            '-', /\d/, /\d/, /\d/, /\d/
        ]
    };

const formatPhoneMask = (rawValue: string): string => {
  return maskitoTransform(rawValue, phoneMask);
};    


export{
    dateMask,
    maskitoElement,
    parseDateMask,
    formatDateMask,
    formatPhoneMask
}
