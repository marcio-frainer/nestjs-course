import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { meta } from 'eslint/lib/rules/*';

export class PlayersValidationParamsPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {

        // console.log(`value ${value}, metadata ${metadata.type}`);
        if (!value) {
            throw new BadRequestException(`Value of param ${metadata.data} may be informated!`);
        }

        return value;
    }

}