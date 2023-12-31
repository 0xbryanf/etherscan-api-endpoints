import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Ethereum/Goerli/Accounts/getBalance/getBalance.validation';
import GoerliBalanceService from '@/resources/Ethereum/Goerli/Accounts/getBalance/getBalance.service';

class GoerliBalanceController implements Controller {
    public path = '/goerli';
    public router = Router();
    private GoerliBalanceService = new GoerliBalanceService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/get-balance`,
            ValidationMiddleware(Validate.getBalance),
            this.getBalance
        )
    }

    private getBalance = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { address } = req.body;
            res.status(200).json(await this.GoerliBalanceService.getBalance(address));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default GoerliBalanceController;