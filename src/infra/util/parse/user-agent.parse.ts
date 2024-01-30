import { FastifyRequest } from 'fastify';
import useragent from 'useragent';

export const userAgentParse = (request: FastifyRequest) => {
  const raw = (request.raw ?? { connection: {} }) as any;
  const userAgent = request.headers['user-agent'];
  const agent = useragent.parse(userAgent);
  return {
    useAgent: {
      family: agent.family,
      version: agent.toVersion(),
      ip: request.ip,
      ipRaw: raw.ip || '',
      ips: request.ips,
      ipRemote: raw.connection.remoteAddress,
      browser: agent.toAgent(),
      os: agent.os.toString(),
      devide: agent.device.toString(),
    },
  };
};
